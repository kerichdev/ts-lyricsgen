import html2canvas from "html2canvas";

const exportAsImage = async (el: HTMLDivElement | null, imageFilename: string) => {
  if (el) {
    const canvas = await html2canvas(el, { useCORS: true });
    const image = canvas.toDataURL("image/png", 1.0);
    downloadImage(image, imageFilename);
  } else {
    throw new Error("Element not found");
  }
};

const downloadImage = (blob: string, filename: string) => {
  const fakeLink = window.document.createElement("a");
  fakeLink.setAttribute("style", "display: none;");
  fakeLink.download = filename;

  fakeLink.href = blob;

  document.body.appendChild(fakeLink);
  fakeLink.click();
  document.body.removeChild(fakeLink);

  fakeLink.remove();
};

export default exportAsImage;
