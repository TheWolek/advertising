const Hamburger = document.getElementById('hamburger')
const Nav = document.querySelector('.nav-expand')

let navActive = false

Hamburger.addEventListener('click', function () {
    Nav.classList.toggle('nav-active')
})