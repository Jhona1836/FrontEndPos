import Lottie from "lottie-react";
import AnimationLoading from '../assets/card-animation/AnimationLoading.json'

export default function CardLoader ({size= 120, text= 'Cargando'}){

    return(
        <div className="flex flex-col items-center justify-center gap-2">
            <Lottie 
            animationData={AnimationLoading}
            loop={true}
            style={{ width: size, height: size }}
            />

            {text && (
                <p className="text-sm animate-pulse">
                    {text}
                    {}
                </p>
            )}
        </div>
    )
}