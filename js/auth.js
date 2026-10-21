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
            var email = document.createElement("span");
            email.className = "user-email";
            email.textContent = session.user.email;

            var logout = document.createElement("button");
            logout.type = "button";
            logout.textContent = "로그아웃";
            logout.addEventListener("click", function () {
                window.sb.auth.signOut();
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
})();
