import React from 'react'

export default function EditGallery({ images }) {

  return (
	  <div className='grid gap-1 mb-2'>{images?.map((image) => (
		  <div key={image.id} className='col-3'>
			  <img src={image.url} alt={image.alt} />
		  </div>
	  ))}</div>
  )
}
