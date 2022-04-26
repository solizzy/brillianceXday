function indexPageMessages(searchResults) {
  const messages = searchResults.querySelectorAll(
    `[id^="search-result-"]`
  );

  const usernameMap = {
    "KDot.-": "Brilliance",
    "Izzy": "Day",
  };

  const sorted = [...messages].reduce((arr, el) => {
    if (el.querySelector(`.headerText-2z4IhQ`)) {
      const nameEl = el.querySelector(`.headerText-2z4IhQ`);
      const userID = nameEl.textContent;
      const from = usernameMap[userID];
      const textEl = el.querySelector(`.messageContent-2t3eCI`);
      const text = textEl.innerHTML;

      arr.push({ from, text });
    }

    return arr;
  }, []);

  return sorted;
}

let history = [];

function indexPageMessages(searchResults) {
  const messages = searchResults.querySelectorAll(
    `[id^="search-result-"]`
  );

  const usernameMap = {
    "KDot.-": "Brilliance",
    "Izzy": "Day",
  };

  const sorted = [...messages].reduce((arr, el) => {
    if (el.querySelector(`.headerText-2z4IhQ`)) {
      const nameEl = el.querySelector(`.headerText-2z4IhQ`);
      const userID = nameEl.textContent;
      const from = usernameMap[userID];
      const textEl = el.querySelector(`.messageContent-2t3eCI`);
      const text = textEl.innerHTML;

      arr.push({ from, text });
    }

    return arr;
  }, []);

  return sorted;
}

history.push(...indexPageMessages(document.querySelector("#search-results")))
console.log(history);
document.querySelector(`[type="button"][rel="next"]`).click();