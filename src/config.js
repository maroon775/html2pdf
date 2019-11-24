import Html2Pdf from '@/module/Hmtl2Pdf';
import Dashboard from '@/module/Dashboard';

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
    ]
};
