async function loadFooter() {
  const footer = await fetch("./footer.html").then((response) =>
    response.text()
  );
  document.body.insertAdjacentHTML("beforeend", footer);
}
loadFooter();
