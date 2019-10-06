/**
 * @file 连接列表
 * @author netcon
 */

import {get} from 'lodash/fp';
import {useSelector} from 'react-redux';
import ResizableTable from '@/components/ResizableTable';
import ConnectionUrl from './ConnectionUrl';

const columns = [
    {
        title: 'Name',
        dataIndex: 'url',
        width: 150,
        render(text) {
            return <ConnectionUrl value={text} />;
        },
    },
    {
        title: 'Status',
        dataIndex: 'status',
    },
];

const data = [
    {
        url: 'http://www.baidu.com/abc',
    },
    {
        url: 'http://www.baidu.com/123?name=123',
    },
    {
        url: 'http://www.baidu.com',
    },
];

const Connections = () => {
    // const connections = useSelector(get('connections'));

    // return <div>hello</div>;
    return <ResizableTable columns={columns} dataSource={data} size="small" />;
};

export default Connections;
