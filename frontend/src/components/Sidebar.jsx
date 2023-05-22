import React from 'react'
import CreateEventButton from './sidebarComponents/CreateEventButton'
import SmallCalendar from './sidebarComponents/SmallCalendar'
import Colors from './sidebarComponents/Colors'

export default function Sidebar() {
  return (
    <aside className='p-5 w-64'>
      <CreateEventButton/>
      <SmallCalendar/>
      <Colors/>
    </aside>
  )
}
