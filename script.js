const getData = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const article = urlParams.get("article");
  const response = await fetch(`assets/${article}/data.json`);
  return await response.json();
};

const renderText = (main, text) => {
    const textElement = document.createElement("p");
    textElement.classList.add("text");
    textElement.innerHTML = text;
    main.appendChild(textElement);
    return textElement;
};

const renderQuote = (main, quote) => {
    const quoteElement = document.createElement("p");
    quoteElement.classList.add("quote");
    quoteElement.innerHTML = `<img class="quote-open" src="assets/quote-open.png" /><span>“ ${quote} ”</span>`;
    main.appendChild(quoteElement);
    return quoteElement;
};

const renderImage = (main, imgUrl) => {
    const imgElement = document.createElement("img");
    imgElement.classList.add("image");
    imgElement.src = imgUrl;
    imgElement.alt = "Image";
    main.appendChild(imgElement);
    return imgElement;
};

const renderVideo = (main, videoUrl) => {
    const videoElement = document.createElement("iframe");
    videoElement.classList.add("video");
    videoElement.src = videoUrl;
    videoElement.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    videoElement.allowFullscreen = true;
    main.appendChild(videoElement);

};

const renderVideoEnd = (main, videoUrl) => {
    const videoElement = document.createElement("iframe");
    videoElement.classList.add("video");
    videoElement.classList.add("end");
    videoElement.src = videoUrl;
    videoElement.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    videoElement.allowFullscreen = true;
    main.appendChild(videoElement);

};

const renderContent = (content) => {
  const main = document.getElementById("main");
  ({
    text: renderText,
    quote: renderQuote,
    image: renderImage,
    video: renderVideo,
    video_end: renderVideoEnd,
  })[content.type](main, content.content);
};

const renderPage = (data) => {
  const cover = document.getElementById("cover");
  const title = document.getElementById("title");

  document.title = `${data.article} - Valentina Sieplin`;
  cover.innerHTML = `<img src="${data.cover}" alt="${data.title}">`;
  title.src = data.title;
  console.log(title);
  data.page_content.forEach(renderContent);
};

getData().then(renderPage);
