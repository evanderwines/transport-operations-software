import { Reservation } from '@/types'

import TabOrderDetails from '@/components/tab-order-details'
import { useState } from 'react'
import TabDriverInformation from '@/components/tab-driver-information'

const FloatingReservationDetails = ({ reservation }: { reservation: Reservation }) => {
	const [tabIndex, setTabIndex] = useState(0);

    const tabs = [
        { text: "Delivery details", component: <TabOrderDetails reservation={reservation} /> },
        { text: "Driver Information", component: <TabDriverInformation driver={reservation.dispatch.vehicle.driver} /> },
        { text: "Vehicle", component: <TabOrderDetails reservation={reservation} /> },
        { text: "Customer Information", component: <TabOrderDetails reservation={reservation} /> },
        { text: "Documents", component: <TabOrderDetails reservation={reservation} /> }

    ]
    return (
        <div className='w-160 absolute bottom-5 left-[50%] -translate-x-[50%] z-10 bg-white rounded-md shadow-md'>
            <div className='flex justify-between p-2 px-4 pb-0 mb-1 border-b-1'>
                {tabs.map((tab, index) => (
                    <p key={index} className={'text-sm pb-1 cursor-pointer ' + (index == tabIndex && ' border-b-2 border-sky-400')}
                        onClick={() => { setTabIndex(index) }}
                    >
                        {tab.text}
                    </p>
                )
                )}
            </div>

            {tabs[tabIndex].component}
        </div>

    )
}

export default FloatingReservationDetails