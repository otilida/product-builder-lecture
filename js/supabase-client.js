// supabase-js(CDN)가 먼저 로드되어 있어야 합니다. (window.supabase)
// URL은 프로젝트 기본 주소입니다 (/rest/v1/ 경로는 붙이지 않음 — SDK가 알아서 붙입니다).
// anon(publishable) 키는 공개되어도 되는 값입니다. service_role 키는 절대 넣지 마세요.
(function () {
    var SUPABASE_URL = "https://bkqsfnrdadmzipynvpwk.supabase.co";
    var SUPABASE_ANON_KEY = "sb_publishable_RmFNTYHYyoUkCyfhiOUAnw_dstA7yaB";

    window.sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
})();
