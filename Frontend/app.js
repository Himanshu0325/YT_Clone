gsap.from("#page1 #h1",{
  opacity:0,
  scale:0,
  delay:1,
  duration:2,
})

gsap.from(".page2 .left",{
  opacity:0,
  x:-500,
  delay:1,
  duration:2,
  scrollTrigger:{
    trigger:".page2 .left",
    scroller:"body",
    scrub:5
  }
})

gsap.from(".page2 .right",{
  opacity:0,
  x:500,
  delay:1,
  duration:2,
  scrollTrigger:{
    trigger:".page2 .right",
    scroller:"body",
    scrub:5
  }
})