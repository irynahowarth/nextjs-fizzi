"use client"

import { Environment } from "@react-three/drei"
import { use, useRef } from "react"
import { Group } from "three"
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

import FloatingCan from "@/components/FloatingCan"

gsap.registerPlugin(ScrollTrigger, useGSAP)

type Props = {}

export default function Scene({}: Props) {
    const canRef = useRef<Group>(null)
    // const bgColors = ["#FFA6B5", "E9CFF6", "#CBEF9A"]
    const bgColors = ["#FFA6B5", "#E9CFF6", "#CBEF9A"]

    useGSAP(()=>{
        if(!canRef) return

        const sections = gsap.utils.toArray(".alternating-section")
        
        const scrollTl = gsap.timeline({
            scrollTrigger:{
                trigger: ".alternating-text-view",
                endTrigger: ".alternating-text-container",
                pin: true,
                start: "top top",
                end: "bottom bottom",
                scrub: true
            }
        })

        sections.forEach((_, index)=>{
            if(!canRef) return
            if(index === 0 )return

            const isOdd = index % 2 !== 0;

            scrollTl
            .to(canRef.current.position, {
                x: isOdd ? "-0.8" : "0.8",
                ease: "circ.inOut",
                delay: 0.5
            })
            .to(canRef.current.position, {
                y: isOdd ? "0.4" : "-0.4",
                ease: "back.inOut",
            },"<")
            .to(".alternating-text-container", {
                backgroundColor: gsap.utils.wrap(bgColors, index)
            },) 
        })



    })

  return (
    <group ref={canRef} position-x={0.75} rotation-y={-0.3}>
        <FloatingCan flavor="strawberryLemonade"/>
        <Environment files={"/hdr/lobby.hdr"} environmentIntensity={1.5}/>
    </group>
  )
} 