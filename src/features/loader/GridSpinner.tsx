import { GridLoader } from "react-spinners"

const GridSpinner = ({loading}:{loading:boolean}) => {
  const override = {
    display: 'block',
    margin: '100px auto'
  }

  return (
    <GridLoader 
      loading={loading}
      cssOverride={override}
      size={150}
      />
  )
}

export default GridSpinner