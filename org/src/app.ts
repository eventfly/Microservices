import express, { Request, Response } from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import cors from 'cors'

import { errorHandler } from './middlewares/error-handler';

import { NotFoundError } from './errors/not-found-error';
import { orgSignupRouter } from './routes/org-signup';
import { createEventRouter } from './routes/create-event';
import { createStaffRouter } from './routes/create-staff';
import { getEventRouter } from './routes/get-event';
import { createTagRouter } from './routes/create-tag';
import { getTagsRouter } from './routes/get-tags';
import { editProfileRouter } from './routes/edit-profile';
import { getStaffRouter } from './routes/get-staff';
import { getEventsByStaffRouter } from './routes/get-events-by-staff';
import { addRoleRouter } from './routes/add-role';
import { editRoleRouter } from './routes/edit-role';
import { removeRoleRouter } from './routes/remove-role';
import { removeStaffRouter } from './routes/remove-staff';
import { editStaffRoleRouter } from './routes/edit-staff-role';
import { getAllStaffsRouter } from './routes/get-all-staffs';
import { getOrgDataRouter } from './routes/get-org-data';
import { getOrgRolesRouter } from './routes/get-org-roles';
import { createPackageRouter } from './routes/create-package';
import { createOrderRouter } from './routes/create-order';
import { getPackagesRouter } from './routes/get-packages';
import { getOrgProfileRouter } from './routes/get-org-profile';
import { getBillingDetailsRouter } from './routes/get-billing-details';

const app = express()
app.use(cors({origin: '*'}));

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Expose-Headers', 'Access-Token, Uid')

    next(); 
})

// app.set('trust proxy', true)
app.use(json())
app.use(orgSignupRouter)
app.use(createEventRouter)
app.use(createStaffRouter)
app.use(getEventRouter)
app.use(createTagRouter)
app.use(getTagsRouter)
app.use(editProfileRouter)
app.use(getStaffRouter)
app.use(getEventsByStaffRouter)
app.use(addRoleRouter)
app.use(editRoleRouter)
app.use(removeRoleRouter)
app.use(removeStaffRouter)
app.use(editStaffRoleRouter)
app.use(getAllStaffsRouter)
app.use(getOrgDataRouter)
app.use(getOrgRolesRouter)

app.use(createPackageRouter)
app.use(createOrderRouter)
app.use(getPackagesRouter)
app.use(getOrgProfileRouter);
app.use(getBillingDetailsRouter)

app.all('*', async (req, res, next) => {
    throw new NotFoundError()
})
app.use(errorHandler)


export { app }