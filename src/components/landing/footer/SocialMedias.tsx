import { IconBrandFacebook, IconBrandGithub, IconBrandInstagram, IconBrandYoutube } from "@tabler/icons-react"
import SocialMedia from "./SocialMedia"

export default function SocialMedias() {
    return (
        <div className="flex">
            <SocialMedia icone={<IconBrandYoutube />} url="https://www.youtube.com/@cod3r" />
            <SocialMedia icone={<IconBrandInstagram />} url="https://www.instagram.com/cod3rcursos" />
            <SocialMedia icone={<IconBrandFacebook />} url="https://www.facebook.com/cod3rcursos/" />
            <SocialMedia icone={<IconBrandGithub />} url="https://github.com/cod3rcursos" />
        </div>
    )
}