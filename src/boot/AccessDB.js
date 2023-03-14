import { boot } from 'quasar/wrappers'
import axios from 'axios'

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
const ADB = axios.create({ baseURL: 'http://192.168.12.13:1619/access/public' })

export { ADB }
