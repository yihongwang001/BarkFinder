import { useEffect } from "react";

const useSlider = (slideImage, slideText, images) => {
  let slideCounter = 0;

  useEffect(() => startSlider(), [images]); //fix

  const startSlider = () => {
    slideImage.current.style.backgroundImage = `linear-gradient(
            to right,
            rgba(34, 34, 34, 0.4),
            rgba(68, 68, 68, 0.4)
            ), url(${images[0].picLink})`;
    slideText.current.innerHTML = images[0].name;
  };

  const handleSlide = (slide) => {
    slideImage.current.style.backgroundImage = `linear-gradient(
            to right,
            rgba(34, 34, 34, 0.4),
            rgba(68, 68, 68, 0.4)
          ), url(${images[slide - 1].picLink})`;
    slideText.current.innerHTML = images[slide - 1].name;
    animateSlide(slideImage);
  };

  const animateSlide = () => {
    slideImage.current.classList.add("fadeIn");
    setTimeout(() => {
      slideImage.current.classList.remove("fadeIn");
    }, 700);
  };

  const goToPreviousSlide = () => {
    if (slideCounter === 0) {
      handleSlide(images.length);
      slideCounter = images.length;
    }

    handleSlide(slideCounter);
    slideCounter--;
  };

  const goToNextSlide = () => {
    if (slideCounter === images.length - 1) {
      startSlider();
      slideCounter = -1;
      animateSlide(slideImage);
    }

    slideImage.current.style.backgroundImage = `linear-gradient(
          to right,
          rgba(34, 34, 34, 0.4),
          rgba(68, 68, 68, 0.4)
          ),url(${images[slideCounter + 1].picLink})`;
    slideText.current.innerHTML = images[slideCounter + 1].name;
    slideCounter++;
    animateSlide(slideImage);
  };

  return { goToPreviousSlide, goToNextSlide };
};

export default useSlider;
