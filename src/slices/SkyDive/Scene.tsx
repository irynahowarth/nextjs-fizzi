"use client"

import FloatingCan from "@/components/FloatingCan"
import { Content } from "@prismicio/client"
import { Cloud, Clouds, Environment, OrbitControls } from "@react-three/drei"
import { useRef } from "react"
import { Text } from "@react-three/drei";
import * as THREE from 'three'
import { useMediaQuery } from "@/hooks/useMediaQuery"

type SkyDiveProps = {
    sentence: string | null;
    flavor: Content.SkyDiveSliceDefaultPrimary["flavor"]
}

export default function Scene({sentence, flavor}: SkyDiveProps) {
    const groupRef  = useRef<THREE.Group>(null)
    const canRef  = useRef<THREE.Group>(null)
    const cloud1Ref  = useRef<THREE.Group>(null)
    const cloud2Ref  = useRef<THREE.Group>(null)
    const cloudsRef  = useRef<THREE.Group>(null)
    const wordsRef  = useRef<THREE.Group>(null)

  return (
    <group ref={groupRef}>
        {/* Can */}
        <group rotation={[0,0,0.5]}>
            <FloatingCan ref={canRef} flavor={flavor}></FloatingCan>
        </group>

        {/* Clouds */}

        <Clouds ref={cloudsRef}>
            <Cloud ref={cloud1Ref} bounds={[10,10,2]}/>
            <Cloud ref={cloud2Ref} bounds={[10,10,2]}/>
        </Clouds>

        {/* Text */}
        <group ref={wordsRef}>
            {sentence && <ThreeText sentence={sentence} color="#F97315"/>}
        </group>

    <OrbitControls />
        {/* Light */}
        <ambientLight intensity={2} color="#9DDEFA" />
        <Environment files="/hdr/field.hdr" environmentIntensity={1.5}/>
    </group>
  )
}

function ThreeText({sentence, color="white"}:{
    sentence: string;
    color?: string
  }){
    const words = sentence.toUpperCase().split(" ")
    const material = new THREE.MeshLambertMaterial();
    const isDesktop = useMediaQuery("(min-width:950px)", true)
    return words.map((word: string, wordIndex: number)=>(
         <Text key={`${wordIndex}-${word}`}
            scale={isDesktop? 1: .5}
            color={color}
            material={material}
            font="/fonts/Alpino-Variable.woff"
            fontWeight={900}
            anchorX={"center"}
            anchorY={"middle"}
            characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ!,.?"


         >{word}</Text>
    ))
}