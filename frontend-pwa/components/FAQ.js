import styles from '../styles/FAQ.module.css'
import Image from 'next/image'
import background_img from '../images/faq-background.svg'
import Link from 'next/link'

const FAQ = ({faqs}) => {
    return ( 

        <>
            <div className={styles.faq_container}>
                <Image
                    className={styles.bg_img}
                    src={background_img}
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    quality={100}
                /> 


                <div className={styles.faq_content}>

                    <div className={styles.title_section}>
                        <h2 className={styles.title}>Frequently Asked Questions</h2>
                    </div>


                    <div className={styles.faq_flexbox}>

                        {
                            faqs.map((faq)=>(
                                <div className={styles.faq_column} key={faq.id}>

                                    <div className={styles.question}>
                                        <h4>
                                            {faq.question}
                                        </h4>
                                    </div>
                                    
                                    <div className={styles.answer}>
                                        {faq.answer}
                                    </div>
        
                                </div>
                            ))
                        }

                    </div>

                </div>
            </div>
        
        </>

    );
}
 
export default FAQ;