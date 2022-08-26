import "./App.css"

type Props = {
  src: string
  alt?: string
}

export const Gif = ({ src, alt = "Gif" }: Props) => (
  <img src={src} alt={alt} className="Gif" />
)
