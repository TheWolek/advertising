const Hamburger = $('#hamburger')
const Nav = $('.nav-expand')

const signInBtn = $("#signInBtn")
const signUpBtn = $("#signUpBtn")
const signInForm = $("#signIn")
const signUpForm = $("#signUp")

const adAddFormRules = $("#adAdd-form-rules")
const adAddFormSubmit = $("#adAdd-form-submit")


Hamburger.on('click', function () {
    Nav.toggleClass('nav-active')
})

function changeTab(tab) {
    if (tab == 0) {
        signInForm.css("display", "block")
        signUpForm.css("display", "none")
        signInBtn.addClass('active')
        signUpBtn.removeClass('active')
    } else {
        signInForm.css("display", "none")
        signUpForm.css("display", "block")
        signUpBtn.addClass('active')
        signInBtn.removeClass('active')
    }
}

signInBtn.on('click', () => { changeTab(0) })
signUpBtn.on('click', () => { changeTab(1) })

adAddFormRules.on('click', () => {
    if (adAddFormSubmit.attr("disabled") == undefined) {
        adAddFormSubmit.attr("disabled", "disabled")
        adAddFormSubmit.addClass("disabled")
    } else {
        adAddFormSubmit.removeAttr("disabled")
        adAddFormSubmit.removeClass("disabled")
    }
    // adAddFormSubmit.toggleClass("disabled")
})