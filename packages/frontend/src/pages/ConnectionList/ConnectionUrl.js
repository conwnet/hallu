/**
 * @file Connection Url
 * @author netcon
 */

import {parse} from 'url';
import {last} from 'lodash/fp';
import {Button, Tooltip} from 'antd';

const ConnectionUrl = ({value, onClick}) => {
    const url = parse(value);
    const name = last(
        [url.hostname, ...url.pathname.split('/')].filter(Boolean)
    );

    return (
        <Tooltip title={value}>
            <Button size="small" type="link" onClick={onClick}>
                {name}
            </Button>
        </Tooltip>
    );
};

export default ConnectionUrl;
