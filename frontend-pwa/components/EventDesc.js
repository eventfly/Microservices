import styles from '../styles/EventDesc.module.css'


const EventDesc = () => {
    return ( 

        <>

            <div className={styles.desc_container}>

                <h1 className={styles.title + " h1"}>Event Description</h1>

                <div className={styles.content}>

                BUET CSE Fest is back with another big event, the Inter University AI CONTEST. This will be an online and individual event. The contest will be based off a multiplayer game. You will be given the game for which you have to implement some logic for your players. Your players will play the game against other players, implemented by other contestants. The matches will be displayed live!!
                <br></br><br></br>
                You will get a time period of 1 week(+) to submit, edit, re-submit your code, fighting against all the contestants to rise above the leaderboard. Experience the thrill of witnessing your code fight against other contestant’s code live!!
                <br></br><br></br>
                The contest will be hosted on codingame. So participants are required to have an account in codingame. If you don’t have an account, please open one as it takes only 1 minute and its completely free.

                </div>

            </div>
        
        </>

    );
}
 
export default EventDesc;