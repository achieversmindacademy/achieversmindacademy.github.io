gsap.registerPlugin(ScrollTrigger);

gsap.from(".hero-content", {
  opacity: 0,
  y: 100,
  duration: 1.5
});

gsap.from(".section", {
  scrollTrigger: ".section",
  opacity: 0,
  y: 80,
  duration: 1.2,
  stagger: 0.2
});

gsap.from(".card", {
  scrollTrigger: ".programs",
  opacity: 0,
  y: 50,
  stagger: 0.2
});
