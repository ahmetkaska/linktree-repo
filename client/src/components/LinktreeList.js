import React, { useEffect, useState } from 'react';
import Linktree from './Linktree';
import { fetchLinktree } from '../api/index'; // api klasöründeki fonksiyonları dahil ediyoruz.
import '../css/linktreeList.css';

const LinktreeList = () => {
    const [linktrees, setLinktrees] = useState([]);

    useEffect(() => {
        // MongoDB'den verileri almak için api'deki fetchLinktree fonksiyonunu kullanıyoruz.
        const getLinktrees = async () => {
            try {
                const response = await fetchLinktree();
                setLinktrees(response.data); // Axios ile dönen veriyi set ediyoruz.
            } catch (error) {
                console.error("Linktree verileri alınamadı", error);
            }
        };

        getLinktrees();
    }, []);

    const filteredLinktrees = linktrees.filter(linktree => linktree.images.length > 0);

    return (
        <div className="linktree-container">
            {filteredLinktrees.length > 0 ? (
                filteredLinktrees.map(linktree => (
                    <div className="linktree-item" key={linktree._id}>
                        <Linktree {...linktree} />
                    </div>
                ))
            ) : (
                <div className="no-linktrees">
                    <p></p>
                </div>
            )}
        </div>
    );
};

export default LinktreeList;
