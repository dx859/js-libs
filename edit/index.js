var boldBtn = document.getElementById('edit-bold');

boldBtn.onclick = function() {
    var aa = document.execCommand('insertHTML', true, '<span>fdafda</span>');
    console.log(aa);
}

document.onkeypress = function(e) {
    e.preventDefault()
    console.log(e.key);

}