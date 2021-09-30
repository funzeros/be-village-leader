const getParentDomByClass = (
  el: HTMLElement,
  className: string
): HTMLElement => {
  if (el.classList.contains(className)) return el;
  else return getParentDomByClass(el.parentNode as HTMLElement, className);
};
export const zIndexMax = (e: MouseEvent, className: string) => {
  const nodeList = document.querySelectorAll(`.${className}`);
  const dom = getParentDomByClass(e.target as HTMLElement, className);
  const zIndexArr: number[] = [];
  nodeList.forEach(m => {
    const d = m as HTMLElement;
    d.style.zIndex = `${Math.max(1, +d.style.zIndex - 1)}`;
    zIndexArr.push(+d.style.zIndex);
  });
  dom.style.zIndex = `${Math.max(...zIndexArr) + 1}`;
};
