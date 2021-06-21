#!/usr/bin/env python
# coding: utf-8

# In[1]:


import os
import json
import re
from typing import List, Dict


# In[4]:


def parseFontTableFile(filename):
    with open(filename,"r") as f:
        fontTableLines:List = f.readlines()

    fontTable:Dict = {}
    for fontTableLine in fontTableLines:
        [jjwxcCharacter, normalCharacter] = fontTableLine.replace('\n','').split('-')
        if jjwxcCharacter == '&#x78"/;':
            jjwxcCharacter = '&#x78;'
        jjwxcCharacter = chr(
            int('0x{}'.format(re.match(r'&#x(\w+);',jjwxcCharacter)[1])
                ,16)
               )
        fontTable[jjwxcCharacter] = normalCharacter
        
    return fontTable


# In[13]:


def main(folder_path):
    _cwd = os.getcwd()
    os.chdir(folder_path)
    fontTables = {}
    for filename in os.listdir():
        [fontName,fileExt] = filename.split('.')
        if fileExt == "txt":
            fontTable = parseFontTableFile(filename)
            fontTables[fontName] = fontTable

    os.chdir(_cwd)
    return fontTables


# In[18]:


fontTables = main("../../tmp/jjwxcNovelCrawler/反爬虫对照表/")
with open("fontTables.json","w") as f:
    json.dump(fontTables,f)

