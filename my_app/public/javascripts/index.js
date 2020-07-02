const Hamburger = document.getElementById('hamburger')
const Nav = document.getElementById('nav-expand')

let navActive = false

Hamburger.addEventListener('click', function () {
    Nav.classList.toggle('nav-active')
})