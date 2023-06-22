import Image from "next/image";

const PreviewPage = ({ params }: { params: { url: string } }) => {
    return <div className='p-5 grid place-items-center'>
        <Image alt='image-preview' src={`https://image.tmdb.org/t/p/original/${params.url}`} width={800} height={600}  className="max-w-lg"/>
    </div>
}

export default PreviewPage;