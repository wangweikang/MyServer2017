var apiUserGenerateToken = function (form, callback) {
    var path = '/api/user/generate/token'
    ajax('POST', path, form, callback)
}

var registerCheckCodeTemplate = function () {
    var t = `
        <img src="/user/register/code" class='register-code-image'>
        <div class="input-group register-code-form">
            <input id="id-input-check-code" class="form-control" type="text" placeholder="请输入验证码">
            <span class="input-group-btn">
                <button id="id-button-generate-token" type="button" class="btn btn-default" name="button">生成登录密钥</button>
            </span>
        </div>
        <p class="check-code-label" style="display:none">
            <i class="icon icon-exclamation-sign"></i>
            <span></span>
        </p>
    `
    return t
}

var userTokenTemplate = function (user_token) {
    var t = `
        已为您生成一个新的登录密钥：
        <p class='user-token'>${user_token}</p>
        请妥善保存您的登录密钥，一旦丢失，将无法找回您的 todo 列表
    `
    return t
}

var bindEventRefreshCheckCode = function () {
    var codeImage = e('.register-code-image')
    codeImage.addEventListener('click', function () {
        codeImage.src = '/user/register/code?random=' + Math.random()
    })
}

var bindEventGenerateUserToken = function () {
    var generateToken = e('#id-button-generate-token')
    var container = generateToken.closest('.container')
    var alertWarning = generateToken.closest('.alert-warning')
    var input = alertWarning.querySelector('#id-input-check-code')
    var checkCodeLabel = alertWarning.querySelector('.check-code-label')
    var checkCodeTip = checkCodeLabel.querySelector('span')
    generateToken.addEventListener('click', function () {
        form = {
            'check_code': input.value,
        }
        apiUserGenerateToken(form, function (r) {
            var response = JSON.parse(r)
            var success = response.success
            if (success) {
                var user_token = response.user_token
                var alertDanger = container.querySelector('.alert-danger')
                var div = document.createElement('div')
                if (alertDanger != null) {
                    alertDanger.remove()
                }
                div.setAttribute('class', 'alert alert-danger todo-token-form')
                div.setAttribute('role', 'alert')
                div.innerHTML = userTokenTemplate(user_token)
                container.insertBefore(div, alertWarning.nextSibling)
                alertWarning.remove()
            } else {
                checkCodeLabel.style.display = 'block'
                checkCodeTip.innerText = '验证码错误'
                shake(alertWarning, 500)
            }

        })
    })
}

var bindEventGenerateCode = function () {
    var generateToken = e('#id-a-generate-code')
    var container = generateToken.closest('.container')
    var alertInfo = generateToken.closest('.alert-info')
    generateToken.addEventListener('click', function () {
        var alertWarning = container.querySelector('.alert-warning')
        var alertDanger = container.querySelector('.alert-danger')
        if (alertWarning == null && alertDanger == null) {
            var div = document.createElement('div')
            div.setAttribute('class', 'alert alert-warning')
            div.setAttribute('role', 'alert')
            div.innerHTML = registerCheckCodeTemplate()
            container.insertBefore(div, alertInfo.nextSibling)
            bindEventRefreshCheckCode()
            bindEventGenerateUserToken()
        } else {
            if (alertWarning != null) {
                var checkCodeLabel = alertWarning.querySelector('.check-code-label')
                var checkCodeTip = checkCodeLabel.querySelector('span')
                checkCodeLabel.style.display = 'block'
                checkCodeTip.innerText = '请输入验证码'
                shake(alertWarning, 500)
            } else if (alertDanger != null) {
                shake(alertDanger, 500)
            }
        }
    })
}

var bindEvents = function () {
    bindEventGenerateCode()
}

var __main = function () {
    bindEvents()
}

__main()
