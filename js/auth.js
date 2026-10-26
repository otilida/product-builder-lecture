// 모든 페이지에서 supabase-client.js 다음에 불러옵니다.
(function () {
    var nav = document.createElement("nav");
    nav.className = "auth-nav";
    document.body.classList.add("has-auth-nav");
    document.body.insertBefore(nav, document.body.firstChild);

    function render(session) {
        nav.textContent = "";

        var brand = document.createElement("a");
        brand.className = "brand";
        brand.href = "index.html";
        brand.textContent = "🎱 로또 번호 추천";

        var menu = document.createElement("div");
        menu.className = "menu";

        if (session && session.user) {
            var email = document.createElement("a");
            email.className = "user-email";
            email.href = "mypage.html";
            email.title = "마이페이지";
            email.textContent = session.user.email;

            var logout = document.createElement("button");
            logout.type = "button";
            logout.textContent = "로그아웃";
            logout.addEventListener("click", async function () {
                var res = await window.sb.auth.signOut();
                if (!res.error) {
                    location.href = "index.html";
                }
            });

            menu.appendChild(email);
            menu.appendChild(logout);
        } else {
            var login = document.createElement("a");
            login.href = "login.html";
            login.textContent = "로그인";

            var signup = document.createElement("a");
            signup.href = "signup.html";
            signup.textContent = "회원가입";

            menu.appendChild(login);
            menu.appendChild(document.createTextNode("/"));
            menu.appendChild(signup);
        }

        nav.appendChild(brand);
        nav.appendChild(menu);
    }

    render(null);

    window.sb.auth.getSession().then(function (res) {
        render(res.data.session);
    });

    window.sb.auth.onAuthStateChange(function (event, session) {
        render(session);
    });

    // "Google로 계속하기" 버튼 (login.html, signup.html). 구글 로그인 후 index.html로 돌아옵니다.
    var googleBtn = document.getElementById("googleBtn");
    if (googleBtn) {
        googleBtn.addEventListener("click", async function () {
            googleBtn.disabled = true;
            var res = await window.sb.auth.signInWithOAuth({
                provider: "google",
                options: { redirectTo: new URL("index.html", location.href).href }
            });
            if (res.error) {
                googleBtn.disabled = false;
                var m = document.getElementById("message");
                if (m) {
                    m.textContent = "Google 로그인을 시작하지 못했습니다. 잠시 후 다시 시도해 주세요.";
                    m.className = "auth-message error";
                }
            }
        });
    }
})();
