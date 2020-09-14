const menuIcon = document.querySelector('.menu-icon');

menuIcon.addEventListener('click', toggle);

function copied(element) {
    
    span_link = element.parentNode.childNodes[0];
    copy_btn = element.parentNode.childNodes[1];
    console.log('element : ', span_link);
    var copyText = span_link;
    var textArea = document.createElement("textarea");
    textArea.value = copyText.textContent;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("Copy");
    textArea.remove();
   
    copy_btn.innerHTML = "Copied!";
    copy_btn.style.backgroundColor = 'purple'
}

async function shrten_url() {
    var url = document.getElementById('origin-url').value;
    var url_element = document.getElementById('origin-url');

    /* data validation */
    if (url == "") {
        url_element.style.border = "2px solid magenta";
        url_element.classList.add("error")
        document.getElementById("error-text").style.display = "contents";
        document.getElementById("error-text").style.position = "absolute";
        document.getElementById("btn-shorten").style.marginBottom = "15px"
        return;
    }

    /* hit to generate shortened link and append it to html */
    let response = await fetch('https://cu8.in/api/?action=short&urls=|'+ url +'|');
    let results = await response.json();
    if (results.status == 200) {
        var original_link = results.data.targetUrls[0];
        var shortened_link = results.data.shortUrl.secure;
        create_shortened_result(original_link, shortened_link)
        url_element.value = "";
    }
}

function create_shortened_result(origin_link, shortened_link) {

    var parent_div = document.createElement("div");
    parent_div.className = "shortened-link";

    /* Adding first span for orign url before shortening it */
    var span = document.createElement("span");
    span.className = "slide-right";
    span.innerHTML = origin_link;

    /* append span to the parent div */
    parent_div.appendChild(span);

    /* adding internal div for shortened link and copy btn */
    var internal_div = document.createElement("div");
    internal_div.className = "shortened";

    /* adding internal span for shortened url */
    var internal_span = document.createElement("span");
    internal_span.className = "slide-left";
    internal_span.id = "link";
    internal_span.innerHTML = shortened_link;

    /* append internal span to the internal div */
    internal_div.appendChild(internal_span);

    /* adding internal button to copy shortened data into clipboard */
    var copy_btn = document.createElement("button");
    copy_btn.className = "slide-left";
    copy_btn.id = "copy";
    copy_btn.innerHTML = "Copy";
    copy_btn.setAttribute('onclick', 'copied(this)');

    /* append copy button to the internal div */
    internal_div.appendChild(copy_btn);

    /* append internal div to the parent div */
    parent_div.appendChild(internal_div);

    var shortened_urls_div = document.getElementById("shortened_links");

    /* finally adding div to the dom */
    shortened_urls_div.appendChild(parent_div);

}

function toggle() {
    const mobileNav = document.querySelector('.mobile-nav');
    mobileNav.classList.toggle('mobile');
}