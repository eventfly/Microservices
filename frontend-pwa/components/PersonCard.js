import styles from '../styles/PersonCard.module.css'
import avatar1 from '../images/avatar_1.jpg'
import Image from 'next/image'
import Link from 'next/link'


const PersonCard = ({team}) => {
    return ( 

        <>

            <div className={styles.team_container + " container"}>
            
                {
                    team.map((person)=>(
                        <div className={styles.team_card} key={person.id}>

                            <div className={styles.profile_pic}>
                                <Image
                                    src={avatar1}
                                    placeholder="blur"
                                    layout="fill"
                                    objectFit="contain"
                                    objectPosition="left"
                                    priority
                                />
                            </div>
        
                            <div className={styles.name}>
                                <h5>{person.name}</h5>
                            </div>
                            <div className={styles.designation}>
                                {person.designation}
                            </div>
                            <div className={styles.description}>
                                {person.description}
                            </div>
                            <div className={styles.media_link}>
                                <Link href="/events/iupc/"><a>Twitter</a></Link>
                            </div>
                        </div>


                    ))
                }

            </div>

        </>

    );
}
 
export default PersonCard;