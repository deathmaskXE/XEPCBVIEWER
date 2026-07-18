import {createAuthUser} from './authService';import {createCourierUser} from '../users/userService';import {createCourierProfile} from '../couriers/courierService';
export async function registerCourier(data){const credential=await createAuthUser(data.email,data.password);await createCourierUser(credential.user.uid,data);await createCourierProfile(credential.user.uid,data);return credential.user}
