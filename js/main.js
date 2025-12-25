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
/*
document.querySelectorAll("section").forEach(sec => {
  gsap.from(sec, {
    scrollTrigger: {
      trigger: sec,
      start: "top 80%",
      end: "bottom 20%",
      toggleActions: "play none none reverse"
    },
    opacity: 0,
    y: 80,
    duration: 1.2
  });
});

barba.init({
  transitions: [
    {
      name: "fade",
      leave(data) {
        return gsap.to(data.current.container, {
          opacity: 0,
          duration: 0.5
        });
      },
      enter(data) {
        return gsap.from(data.next.container, {
          opacity: 0,
          duration: 0.5
        });
      }
    }
  ]
});*/

window.addEventListener("load", () => {
  gsap.from("#intro img", {
    scale: 0.6,
    opacity: 0,
    duration: 1.5,
    ease: "power3.out"
  });

  gsap.from("#intro h1, #intro p", {
    opacity: 0,
    y: 20,
    duration: 1.2,
    delay: 0.6,
    stagger: 0.2
  });

  gsap.to("#intro", {
    opacity: 0,
    delay: 2.8,
    duration: 1,
    ease: "power2.out",
    onComplete: () => {
      document.getElementById("intro").remove();
    }
  });
});
