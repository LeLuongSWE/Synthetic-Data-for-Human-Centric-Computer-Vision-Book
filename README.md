# Synthetic Data for Human-Centric Computer Vision

Repository nguồn cho tài liệu **Synthetic Data for Human-Centric Computer Vision**.

## Trạng thái hiện tại

- Kiến trúc: 26 chương, 8 phần, 5 phụ lục.
- Phần giới thiệu không tính là một chương.
- Chương 1: bản thảo để duyệt.
- Chương 2: bản thảo để duyệt.
- Git là nguồn nội dung chuẩn; Notion là bản đọc và duyệt.

## Cấu trúc

- `chapters/`: nội dung sách theo từng chương.
- `assets/`: hình minh họa, chia theo chương.
- `docs/source-map.md`: yêu cầu nguồn và bằng chứng cho từng chương.
- `docs/book-architecture.md`: kiến trúc toàn sách.
- `docs/writing-guide.md`: quy tắc biên soạn.
- `docs/notion-pages.yml`: ánh xạ tệp Git sang trang Notion.
- `code/`: mã thực hành đi kèm chương.
- `references/`: hướng dẫn quản lý tài liệu nguồn không đưa trực tiếp vào Git.

## Quy tắc nguồn chuẩn

1. Mọi thay đổi nội dung bắt đầu từ một branch Git.
2. Chỉ bản đã merge vào `main` mới được xuất sang Notion.
3. Không lấy thay đổi trực tiếp trên Notion ghi đè tự động vào Git.
4. Hình dùng đường dẫn tương đối và được lưu cùng repository.
5. Mỗi commit nên chỉ chứa một thay đổi có mục đích rõ ràng.

Xem [quy trình version control](docs/version-control-workflow.md).

