# Synthetic Data for Human-Centric Computer Vision

Repository nguồn cho tài liệu **Synthetic Data for Human-Centric Computer Vision**.

## Trạng thái hiện tại

- Kiến trúc: 26 chương, 8 phần, 5 phụ lục.
- Phần giới thiệu không tính là một chương.
- Chương 1: bản thảo để duyệt.
- Chương 2: bản thảo để duyệt.
- Git là nguồn nội dung chuẩn; website MkDocs là bản đọc; Notion chỉ theo dõi tiến độ và ghi chú học tập.

## Cấu trúc

- `chapters/`: nội dung sách theo từng chương.
- `assets/`: hình minh họa, chia theo chương.
- `docs/source-map.md`: yêu cầu nguồn và bằng chứng cho từng chương.
- `docs/book-architecture.md`: kiến trúc toàn sách.
- `docs/writing-guide.md`: quy tắc biên soạn.
- `docs/notion-pages.yml`: ánh xạ lịch sử tới các trang Notion cũ; đồng bộ nội dung đang tắt.
- `code/`: mã thực hành đi kèm chương.
- `references/`: hướng dẫn quản lý tài liệu nguồn không đưa trực tiếp vào Git.

## Quy tắc nguồn chuẩn

1. Mọi thay đổi nội dung bắt đầu từ một branch Git.
2. Chỉ bản đã merge vào `main` mới được xuất bản lên website.
3. Không sao chép toàn bộ chương sang Notion hoặc lấy ghi chú Notion ghi đè vào Git.
4. Hình dùng đường dẫn tương đối và được lưu cùng repository.
5. Mỗi commit nên chỉ chứa một thay đổi có mục đích rõ ràng.

Xem [quy trình version control](docs/version-control-workflow.md).

## Bản đọc MkDocs

Sau khi GitHub Pages được bật, bản đọc dự kiến ở:

<https://leluongswe.github.io/Synthetic-Data-for-Human-Centric-Computer-Vision-Book/>

Chạy thử cục bộ:

```bash
python -m pip install -r requirements-docs.txt
python scripts/prepare_docs.py
mkdocs serve
```

Checklist trong từng chương có thể tích trực tiếp trên website. Tiến độ được lưu
trong trình duyệt hiện tại, không ghi ngược vào Git và không tự đồng bộ sang thiết
bị khác; dùng Notion nếu cần theo dõi tiến độ tổng thể giữa nhiều thiết bị.

Mỗi pull request được kiểm tra bằng `mkdocs build --strict`. Mỗi thay đổi được merge vào `main` sẽ kích hoạt workflow xuất bản.

> **Lưu ý quyền truy cập:** GitHub Pages của repository cá nhân thường là website công khai, kể cả khi repository nguồn là private. Chỉ bật Pages sau khi đã quyết định nội dung sách được phép công khai.
