import React from 'react'
import { Card, CardContent, Typography } from '@material-ui/core'

const InfoBox = ({ title, cases, total }) => {
  return (
    <Card>
      <CardContent>
        <Typography color='textSecondary'>{title}</Typography>
        <h2>{cases}</h2>
        <Typography color='textSecondary'>{total}</Typography>
      </CardContent>
    </Card>
  )
}

export default InfoBox
