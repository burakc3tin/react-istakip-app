import React from 'react'
import { BottomNavigation } from '@mui/material';

export default function Footer() {
    return (
        <BottomNavigation style={{
            background: '#ae383d',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'

        }} sx={{ bottom: 0 }}>

            <a
                style={{
                    letterSpacing: 4,

                    textDecoration: 'none',
                    color: 'wheat'
                }}
                href="https://github.com/burakc3tin/react-istakip-app">Burak Çetin - ♦ Github</a>
        </BottomNavigation>
    )
}
