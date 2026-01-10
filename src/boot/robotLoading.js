import { Loading } from 'quasar'
import RobotLoading from 'src/components/Robot/RobotLoading.vue'

export default () => {
  Loading.setDefaults({
    spinner: RobotLoading,
    spinnerColor: 'primary',
    // backgroundColor: 'white',
    // message: 'Procesando...',
    boxClass:' text-bold text-h6'
  })
}
