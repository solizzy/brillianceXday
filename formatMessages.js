async function getMessages() {
  try {
    const data = await fetch("messageLog.json");
    return await data.json();
  } catch (error) {
    console.error("Something went wrong fetching the JSON!");
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  const messages = await getMessages();
  const messageContainer = document.querySelector("#messages");
  const tocContainer = document.querySelector('#toc');

  const toc = [];

  const handled = messages.reduce((arr, el) => {
    const prevEl = arr.pop();

    if (el.from === "SCENE") {
      const id = `act-${toc.length + 1}`;

      el.text = el.text.replace(
        /<pre>.*>(.*?)<.*<\/pre>/gi,
        "$1"
      ).replace("<h2>", `<h2 id="${id}">`);


      toc.push({ title: el.text.replace(/<h2.*?>(.*?)<\/h2>.*/gi, "$1"), id })
    } else {
      el.text = `<p/>${el.text
        .replace(/<span class="timestamp.*?<\/time><\/span>/gi, "")
        .replaceAll("\n\n", "<p/>")}`;
    }

    if (prevEl?.from === el?.from) {
      prevEl.text += `${el.text}`;
      arr.push(prevEl);
    } else if (prevEl) {
      arr.push(prevEl);
      arr.push(el);
    } else {
      arr.push(el);
    }

    return arr;
  }, []);

  const imgMap = {
    Brilliance: `<img src="brilliance.png"  width=100 class="ava">`,
    Day: `<img src="day.png" width=100  class="ava">`,
  };

  messageContainer.innerHTML = "";

  handled.forEach((message) => {
    if (message.from === "SCENE") {
      messageContainer.innerHTML += message.text;
    } else {
      messageContainer.innerHTML += `<div class="messageBlock">
      <div class="header">${imgMap[message.from]} <span class="name">${
        message.from
      }</span></div>
      <div class="content">${message.text}</div>
      </div>`;
    }
  });

  toc.forEach( (item) => {
    tocContainer.innerHTML += `<li><a href="#${item.id}">${item.title}</a></li>`
  })
});
