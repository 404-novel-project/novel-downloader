import itertools
import os
import shutil
import subprocess
import tempfile
from math import ceil

from fontTools.ttLib import woff2, ttFont
from jinja2 import Environment, FileSystemLoader, select_autoescape

PWD = os.getcwd()
TMP: str = tempfile.mkdtemp()


def clear() -> None:
    """
    清除临时文件
    """
    shutil.rmtree(TMP)


def list_font(ttf: ttFont.TTFont) -> list[str]:
    """
    输入字体文件，输出该字体文件下所有字符。
    """
    return list(set(map(lambda x: chr(x), ttf.getBestCmap().keys())))


def load_font(fontpath: str) -> (ttFont.TTFont, str):
    """
    输入字体文件名，载入字体
    :param fontpath: 字体文件名
    :return: 字体对象, TTF字体跑径
    """
    fontpath = os.path.join(PWD, fontpath)
    if fontpath.endswith('.woff2'):
        tmp_font_path = os.path.join(TMP, 'font.ttf')
        woff2.decompress(fontpath, tmp_font_path)
        ttf = ttFont.TTFont(tmp_font_path)
        return ttf, tmp_font_path
    else:
        ttf = ttFont.TTFont(fontpath)
        return ttf, fontpath


def gen_ocr_text(chars: [str]) -> str:
    """
    输入字符列表，输出 OCR 文本
    :param chars: 字符列表
    :return: OCR 文本
    """
    _chars = filter(lambda x: x, chars)
    _ = iter(_chars)
    chars_split: list[list[str]] = [list(itertools.islice(_, ceil(len(chars) / 10))) for i in range(10)]
    ocr_txt: str = '\n'.join(['    '.join(cs) for cs in chars_split])
    return ocr_txt


def gen_ocr_image(ocr_txt: str, ttf_path: str) -> str:
    """
    调用 imagemagick 生成供 OCR 识别的图片
    :param ocr_txt: 文本路径
    :param ttf_path: 字体路径
    :return: 供 OCR 识别的图片的路径
    """
    txt_path: str = os.path.join(TMP, 'ocr.txt')
    img_path: str = os.path.join(TMP, 'ocr.png')

    with open(txt_path, 'w') as f:
        f.write(ocr_txt)
    subprocess.call(["convert", "-font", ttf_path, "-pointsize", "48", "-interline-spacing", "24", "-background",
                     "rgba(255,255,255)",
                     f"label:@{txt_path}", img_path])
    return img_path


def get_tesseract_result(ocr_img_path: str) -> [str]:
    """
    调用 tesseract 获得 OCR 结果
    :param ocr_img_path: 供 OCR 识别的图片的路径
    :return: 识别字符串
    """
    tesseract_result_path: str = os.path.join(TMP, 'tesseract_result')
    subprocess.call(["tesseract", ocr_img_path, tesseract_result_path, "-l", "chi_sim", "--psm", "6"])
    with open(tesseract_result_path + '.txt', 'r') as f:
        tesseract_result = f.read()
    return list(filter(lambda x: 19967 < ord(x) < 40870, list(tesseract_result)))


def get_table(fontpath: str) -> dict[str, str]:
    """
    输入字体文件名，输出对照表
    :param fontpath: 字体文件名
    :return: 字体对照表
    """
    ttf, fontpath = load_font(fontpath)
    chars = list_font(ttf)
    ocr_txt = gen_ocr_text(chars)
    ocr_img_path = gen_ocr_image(ocr_txt, fontpath)
    tesseract_result = get_tesseract_result(ocr_img_path)
    table = dict(zip(chars, tesseract_result))
    return table


def get_html_text(fontpath: str, table: dict[str, str]) -> str:
    """
    生成对照表HTML文本
    :param fontpath: 字体文件名
    :param table: 字体对照表对象
    :return: 对照表HTML文本
    """
    Env: Environment = Environment(loader=FileSystemLoader(os.path.join(PWD)),
                                   autoescape=select_autoescape())
    htmlTemplate = Env.get_template('font.html.jinja2')

    jjdicts = []
    for k in table:
        jjdict = {'ord': str(hex(ord(k))).replace('0x', 'U+'), 'jjcode': k, 'unicode': table[k]}
        jjdicts.append(jjdict)

    jjdicts.sort(key=lambda x: x['jjcode'])
    htmlText = htmlTemplate.render(fontpath=fontpath, fontname=fontpath.split('.')[0],
                                   is_woff2=fontpath.endswith('.woff2'), jjdicts=jjdicts)
    return htmlText


def main(fontpath: str) -> None:
    """
    主入口
    :param fontpath: 字体路径
    :return:
    """
    table = get_table(fontpath)
    html_text = get_html_text(fontpath, table)
    with open(f'{fontpath}.html', 'w') as f:
        f.write(html_text)
    clear()


if __name__ == '__main__':
    import argparse

    parser = argparse.ArgumentParser(description="自定义字体破解辅助工具。")
    parser.add_argument('fontpath', metavar='font.ttf', help="自定义字体文件")

    args = parser.parse_args()
    if args.fontpath:
        main(args.fontpath)
