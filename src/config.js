import Html2Pdf from '@/modules/Hmtl2Pdf';
import EMR from '@/modules/EMR';
import Dashboard from '@/modules/Dashboard';

export default {
    routes: [
        {
            path: '/',
            exact: true,
            label: 'Home',
            component: Dashboard
        },
        {
            path: '/pdf2html',
            label: 'PDF to HTML',
            component: Html2Pdf
        },
        {
            path: '/emr',
            label: 'Shadowbox EMR',
            component: EMR
        },
    ]
};
