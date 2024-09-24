window.onload = function() {
  const [header, nav, div, footer] = [
    document.querySelector('header')             ,
    document.querySelector('nav')                ,
    document.getElementsByClassName('wrapper')[0],
    document.querySelector('footer')
  ];

  function ajustDivHeight() {
    const avaliableHeight = window.innerHeight
      - header.offsetHeight
      - nav.offsetHeight
      - footer.offsetHeight;
      
    div.style.height = `${avaliableHeight}px`;
  }

  ajustDivHeight();
  window.addEventListener('resize', ajustDivHeight);
}
