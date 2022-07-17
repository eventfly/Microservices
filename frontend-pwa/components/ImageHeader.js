import Image from 'next/image'
import styles from '../styles/ImageHeader.module.css'
import background_img from '../images/background.jpg'
import Link from 'next/link'


const ImageHeader = () => {
    return ( 

        <>

            <div className={styles.img_header}>
                <div className={styles.bg_img}>

                    <Image
                        src={background_img}
                        layout="fill"
                        objectFit="cover"
                        objectPosition="center"
                        quality={100}
                    />             

                </div>

                <div className={styles.content}>
                            
                    <h1>Inspire.  Create.  Build.</h1>
                    <p className={styles.subtitle}>
                        Conference for Creative People
                    </p>

                    <p className={styles.date}>
                        <strong>April 14 - 16, 2021</strong>
                    </p>

                    <div className={styles.button_section}>
                        <Link href="/">
                            <a className={"btn btn-light " + styles.button}>Get Your Ticket Today!</a>
                        </Link>

                    {/* <a href="/demos/event/about" className="btn btn-primary">Get Your Ticket Today!</a> */}

                    </div>

                </div>  

            </div> 

        </>

    );
}
 
export default ImageHeader;