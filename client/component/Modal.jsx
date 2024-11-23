import  { useEffect } from 'react'
import Swal from 'sweetalert2';
export default function Modal(props) {
  return (
    useEffect(()=>{
        if(props.modal){
            Swal.fire({
                title: ` Hi ${props.modal.name}`,
                html: `
                  <div style="text-align: center; font-size: 1.1em;">
                    <p><strong> Your Email is :</strong> ${props.modal.email}</p>
                  </div>
                `,
                showCloseButton: true,
                confirmButtonText: 'OK',
                customClass: {
                  popup: 'animated fadeInDown', // Add animation if desired
                },
              });
        }

    }, [props.modal])
  )
  return null;
}
