/**
 * @file resizable table
 * @author netcon
 */

import {useState, useMemo} from 'react';
import {Resizable} from 'react-resizable';
import classNames from 'classnames';
import {Table} from 'antd';
import styles from './index.less';

const ResizableTitle = ({onResize, width, ...restProps}) => {
    if (!width) {
        return <th {...restProps} />;
    }

    return (
        <Resizable
            width={width}
            height={0}
            onResize={onResize}
            draggableOpts={{enableUserSelectHack: false}}
        >
            <th {...restProps} />
        </Resizable>
    );
};

const components = {
    header: {
        cell: ResizableTitle,
    },
};

const ResizableTable = ({columns: initialColumns, className, ...props}) => {
    const [columns, setColumns] = useState(initialColumns);

    const handleResize = index => (e, {size}) => {
        setColumns(columns => {
            const nextColumns = [...columns];

            nextColumns[index] = {
                ...nextColumns[index],
                width: size.width,
            };
            return nextColumns;
        });
    };

    const realColumns = useMemo(
        () =>
            columns.map((col, index) => ({
                ...col,
                onHeaderCell: column => ({
                    width: column.width,
                    onResize: handleResize(index),
                }),
            })),
        [columns]
    );

    return (
        <Table
            className={classNames(className, styles.root)}
            components={components}
            columns={realColumns}
            pagination={false}
            bordered
            {...props}
        />
    );
};

export default ResizableTable;
