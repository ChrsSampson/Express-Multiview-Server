// Check if there is a flash message exists.... Here to prevent errors
if(document.querySelectorAll('.flash-container').length){
    // flash message dissmiss button
    // document.getElementById('dissmiss-btn').onclick = (e) => {
    //     e.target.parentNode.parentNode.style.display = 'none'
    // }
    
    // unmount flash on mouse over
    document.querySelector('.flash-container').onmouseover = (e) => {
        unMount(e.target)
    }

    // unmount flash after a couple seconds if the user ignores it
    setTimeout(() => {
        const self = document.querySelector('.flash-container')
        unMount(self)
    }, 3000)

}

// unmount dom node by setting style to none
function unMount (node) {
    node.style.display = 'none';
}