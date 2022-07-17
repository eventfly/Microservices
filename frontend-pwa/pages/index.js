import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import EventCard from '../components/EventCard'
import FormTitle from "../components/Form/FormTitle";
import { useRouter} from 'next/router'
import {useState, useEffect} from 'react'



export async function getServerSideProps() {

  let isAuth = null

  // if(!isAuth){

  //     return {
  //         redirect: {
  //             destination: '/login',
  //             permanent: false,
  //         },
  //     }
  // }

  return {
    props: {  }
  }
}



export default function Home() {

  const router = useRouter();

  let events = [
    {
      'id': 1,
      'image': 'event1.jpg',
      'title': 'Chicago Art Exhibition 2022',
      'date': 'Dec 12,2021',
      'url': '1',
      'description': 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
    },

    {
      'id': 2,
      'image': 'event2.jpg',
      'title': 'Chicago Art Exhibition 2022',
      'date': 'Dec 12,2021',
      'url': '2',
      'description': 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
    }
  ]

  // useEffect(()=>{
  //     let isAuth = localStorage.getItem('user')

  //     if (!isAuth) {
  //       router.push("/login")
  //     }
  // });


  return (
      <div className="page_style">
        <FormTitle title="Newsfeed" />
        <EventCard event={events[0]}/>
        <EventCard event={events[1]}/>
      </div>
  )
}
