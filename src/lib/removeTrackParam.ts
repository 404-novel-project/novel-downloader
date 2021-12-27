// https://github.com/AdguardTeam/AdguardFilters/tree/master/TrackParamFilter/sections
const general = [
  "nx_source",
  "_zucks_suid",
  "cmpid",
  "asgtbndr",
  "guccounter",
  "guce_referrer",
  "guce_referrer_sig",
  "_openstat",
  "action_object_map",
  "action_ref_map",
  "action_type_map",
  "fb_action_ids",
  "fb_action_types",
  "fb_comment_id",
  "fb_ref",
  "fb_source",
  "fbclid",
  "xtor",
  "utm_campaign",
  "utm_channel",
  "utm_cid",
  "utm_content",
  "utm_id",
  "utm_medium",
  "utm_name",
  "utm_place",
  "utm_pubreferrer",
  "utm_reader",
  "utm_referrer",
  "utm_serial",
  "utm_social",
  "utm_social-type",
  "utm_source",
  "utm_swu",
  "utm_term",
  "utm_userid",
  "utm_viz_id",
  "utm_product",
  "utm_campaignid",
  "utm_ad",
  "utm_brand",
  "utm_emcid",
  "utm_emmid",
  "utm_umguk",
  "gbraid",
  "wbraid",
  "gclsrc",
  "gclid",
  "yclid",
  "dpg_source",
  "dpg_campaign",
  "dpg_medium",
  "dpg_content",
  "admitad_uid",
  "adjust_tracker",
  "adjust_adgroup",
  "adjust_campaign",
  "bsft_clkid",
  "bsft_eid",
  "bsft_mid",
  "bsft_uid",
  "bsft_aaid",
  "bsft_ek",
  "mtm_campaign",
  "mtm_cid",
  "mtm_content",
  "mtm_group",
  "mtm_keyword",
  "mtm_medium",
  "mtm_placement",
  "mtm_source",
  "pk_campaign",
  "pk_medium",
  "pk_source",
  "_branch_match_id",
  "vc_lpp",
  "ml_subscriber",
  "ml_subscriber_hash",
  "rb_clickid",
  "oly_anon_id",
  "oly_enc_id",
  "dt_dapp",
  "dt_platform",
  "spm",
  "scm",
];

const specific: Record<string, string[]> = {
  "bilibili.com": [
    "from",
    "seid",
    "share_source",
    "spm_id_from",
    "from_spm_id",
    "share_medium",
    "share_plat",
    "share_session_id",
    "share_source",
    "share_tag",
    "timestamp",
    "unique_k",
    "from_source",
  ],
};

function findSpecial(host: string) {
  let lastPos = 0;
  let domain = host;
  while (lastPos >= 0) {
    if (specific[domain]) {
      return specific[domain];
    }
    lastPos = host.indexOf(".", lastPos + 1);
    domain = host.slice(lastPos + 1);
  }
}

export function removeTrackParm(_url: string) {
  const url = new URL(_url);
  const host = url.hostname;
  const search = url.searchParams;
  general.forEach((s) => search.delete(s));
  const special = findSpecial(host);
  if (special) {
    special.forEach((s) => search.delete(s));
  }
  return url.href;
}
