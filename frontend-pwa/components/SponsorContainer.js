import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/SponsorContainer.module.css'


const SponsorContainer = ({sponsors}) => {
    return ( 

        <>
        
            <div className={'container ' + styles.sponsor_container}>

                <div className={styles.header}>
                    <div className={styles.subtitle}> 
                        We Are Supported by Awesome Companies 
                    </div>

                    <h1 className={styles.title + " h1"}>
                        Our Sponsors
                    </h1>
                </div>

            </div>


            <div className={styles.sponsor_flexbox}>

                {

                    sponsors.map((sponsor)=>(
                        <div className={styles.sponsor_column} key={sponsor.id}>

                            <div className={styles.sponsor_pic}>

                                <Link href="/">
                                    <a className={styles.sponsor_link}>
                                        <Image
                                            src={sponsor.image}
                                            layout="fill"
                                            objectFit="contain"
                                            objectPosition="center"
                                        />                    
                                    </a>
                                </Link>

                            </div>
        
                        </div>
                    ))

                }


            </div>            
        
        </>

    );
}
 
export default SponsorContainer;